<?php

namespace App\Http\Controllers;

use App\Models\Event;
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


    public function eventIndex()
    {
        return Inertia::render("Homepage/Event/Index", [
            "events" => Event::with("user")->latest()->get()
        ]);
    }


    public function eventShow(Event $event)
    {
        return Inertia::render("Homepage/Event/Show", [
            "event" => $event
        ]);
    }

}
