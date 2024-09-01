<?php

namespace Bootstrap;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Laravel\Sanctum\HasApiTokens;
use ReflectionClass;
use Attribute;

/**
 * @mixin \Eloquent
 */
class Model extends BaseModel {
  use HasApiTokens;

  protected static $unguarded = true;
  protected $hidden = ['password', 'pivot'];

  public function __construct(array $attributes = []) {
    parent::__construct($attributes);

    // unset column properties, so laravel's __get/__set magic methods work correctly
    $reflection = new ReflectionClass($this);
    foreach ($reflection->getProperties() as $property) {
      $attributes = $property->getAttributes(Column::class);
      if (!empty($attributes)) unset($this->{$property->getName()});
    }
  }
}

// simple attribute to mark column properties
#[Attribute(Attribute::TARGET_PROPERTY)]
class Column {
}
