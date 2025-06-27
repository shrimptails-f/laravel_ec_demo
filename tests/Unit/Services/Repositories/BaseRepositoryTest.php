<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Collection;

class BaseRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected BaseRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();

        // Userモデルを使ってBaseRepositoryを作成
        $this->repository = new BaseRepository(new User());
    }

    public function test_all_returns_collection_of_models()
    {
        // テストデータを作成
        User::factory()->count(3)->create();

        // all() メソッドを実行
        $result = $this->repository->all();

        // Collectionが返っていることを確認
        $this->assertInstanceOf(Collection::class, $result);

        // データが正しく取得できているか
        $this->assertCount(3, $result);
    }

    public function test_find_returns_correct_model()
    {
        // テストデータを作成
        $user = User::factory()->create();

        // find() を実行
        $foundUser = $this->repository->find($user->id);

        // モデルが正しく取得できているか
        $this->assertNotNull($foundUser);
        $this->assertEquals($user->id, $foundUser->id);
    }

    public function test_create_inserts_data()
    {
        // データを作成（email を追加）
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Test'
        ];
        $user = $this->repository->create($data);

        // データが保存されているか
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->assertEquals('Test User', $user->name);
        $this->assertEquals('test@example.com', $user->email);
    }

    public function test_update_modifies_existing_data()
    {
        // データを作成
        $user = User::factory()->create(['name' => 'Old Name']);

        // 更新処理
        $this->repository->update($user->id, ['name' => 'New Name']);

        // データが更新されているか
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'New Name']);
    }

    public function test_delete_removes_data()
    {
        // データを作成
        $user = User::factory()->create();

        // 削除処理
        $this->repository->delete($user->id);

        // データが削除されているか
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
