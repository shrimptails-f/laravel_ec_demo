<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;

interface UserServiceInterface
{
    /**
     * @return Collection
     */
    public function getUsers(): Collection;
}
