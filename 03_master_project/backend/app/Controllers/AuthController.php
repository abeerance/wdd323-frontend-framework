<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController {
  function login(Request $request) {
    $email = $request->input('email');
    $password = $request->input('password');

    $user = User::where('email', $email)->first();
    if (!$user)
      return abort(404, 'no such user');
    if (!Hash::check($password, $user->password))
      return abort(401, 'wrong password');

    $token = $user->createToken('bearer');
    return [
      'token' => $token->plainTextToken,
      'user' => $user,
    ];
  }

  function logout(Request $request) {
    $user = Auth::user();
    $user->tokens()->delete();
    return $user;
  }
}
