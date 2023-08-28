<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    
    // protected $fillable = [
    //     'title', 
    //     'description', 
    //     'category', 
    //     'author', 
    //     'image_path'];

}
