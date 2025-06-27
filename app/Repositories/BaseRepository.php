<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

/**
 * Repository層の基底クラス
 *
 */
class BaseRepository
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * すべてのデータを取得
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * ID で検索
     *
     * @param int $id
     * @return Model|null
     */
    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * データを更新
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $record = $this->model->find($id);
        if ($record) {
            return $record->update($data);
        }
        return false;
    }

    /**
     * データを作成
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * ID で削除
     *
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id): ?bool
    {
        return $this->model->find($id)?->delete();
    }
}
