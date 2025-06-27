<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Repositories\UserRepositoryInterface;

class UserService implements UserServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @return Collection
     */
    public function getUsers(): Collection
    {
        return $this->userRepository->all();
    }
}
