<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController {
  function show(Request $request) {
    return Auth::user();
  }

  function create(Request $request) {
    $payload = User::validate($request);
    $user = User::create($payload);
    return $user;
  }

  function update(Request $request) {
    $user = Auth::user();
    $payload = User::validate($request, $user->id);
    $user->update($payload);
    return $user;
  }

  function destroy(Request $request) {
    $user = Auth::user();
    $user->delete();
    return $user;
  }
}
