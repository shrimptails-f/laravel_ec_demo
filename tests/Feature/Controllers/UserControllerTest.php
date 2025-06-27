<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Mockery;
use Inertia\Testing\AssertableInertia as Assert;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $userServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // UserServiceをモックする
        $this->userServiceMock = Mockery::mock(UserService::class);

        // サービスコンテナへモックをバインド
        $this->app->instance(UserService::class, $this->userServiceMock);
    }

    public function test_index_returns_correct_data()
    {
        $mockUsers = User::factory()->count(2)->make();
        $this->userServiceMock->shouldReceive('getUsers')->once()->andReturn($mockUsers);

        // コントローラのアクションを実行
        $response = $this->get(route('welcomePage')); // ルート名に応じて変更

        // ステータスコードが200か確認
        $response->assertStatus(200);

        // Inertiaのレスポンスを確認
        $response->assertInertia(fn(Assert $page) => $page->component('User')->where('users', $mockUsers));
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }
}
