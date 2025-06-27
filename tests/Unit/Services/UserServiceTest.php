<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Mockery;
use Illuminate\Database\Eloquent\Collection;
use App\Services\UserService;
use App\Repositories\UserRepositoryInterface;
use App\Models\User;

class UserServiceTest extends TestCase
{
    protected $userRepositoryMock;
    protected UserService $userService;

    protected function setUp(): void
    {
        parent::setUp();

        // UserRepositoryのモックを作成
        $this->userRepositoryMock = Mockery::mock(UserRepositoryInterface::class);

        // サービスにモックを注入
        $this->userService = new UserService($this->userRepositoryMock);
    }

    public function test_getUsers_returns_collection_of_users()
    {
        // モックの戻り値としてダミーユーザーリストを作成
        $mockUsers = User::factory()->count(2)->make();

        // モックに期待される動作を定義
        $this->userRepositoryMock
            ->shouldReceive('all')
            ->once()
            ->andReturn($mockUsers);

        // メソッドを実行
        $result = $this->userService->getUsers();

        // 戻り値がEloquentのCollectionであることを確認
        $this->assertInstanceOf(Collection::class, $result);

        // モックの戻り値と一致するか検証
        $this->assertCount(2, $result);
        $this->assertContainsEquals($mockUsers[0], $result);
        $this->assertContainsEquals($mockUsers[1], $result);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }
}
