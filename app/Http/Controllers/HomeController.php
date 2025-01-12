<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function postIndex()
    {
        return Inertia::render("Homepage/Post/Index", [
            "posts" => Post::with('user')->latest()->get()
        ]);
    }
}
