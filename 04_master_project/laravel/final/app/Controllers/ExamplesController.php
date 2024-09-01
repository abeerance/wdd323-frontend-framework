<?php

namespace App\Controllers;

use Illuminate\Http\Request;

class ExamplesController {
  function ping(Request $request) {
    return 'pong';
  }

  function about(Request $request) {
    return [
      'laravel' => \App::version(),
      'php' => phpversion(),
      'ini' => php_ini_loaded_file(),
      'host' => $request->getHost(),
      'port' => $request->getPort(),
      'method' => $request->getMethod(),
    ];
  }

  function echo(Request $request) {
    $text = $request->input('text');
    return $text;
  }

  function reverse(Request $request) {
    $text = $request->input('text');
    return strrev($text);
  }

  function sum(Request $request) {
    $numbers = $request->input('numbers');
    return array_sum($numbers);
  }

  function count(Request $request) {
    $text = $request->input('text');
    return str_word_count($text);
  }

  function temperature(Request $request) {
    $celsius = $request->input('celsius');
    return [
      'celsius' => $celsius,
      'kelvin' => $celsius + 273.15,
      'fahrenheit' => ($celsius * 9 / 5) + 32,
    ];
  }

  function bmi(Request $request) {
    $weight = $request->input('weight');
    $height = $request->input('height');
    $bmi = $weight / $height ** 2;
    $category = 'underweight';
    if ($bmi > 18.5) $category = 'normal';
    if ($bmi > 25) $category = 'overweight';
    return [
      'bmi' => $bmi,
      'category' => $category,
    ];
  }
}
