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
    "events" => Event::with("user")
        ->get()
        ->map(function ($event) {
            $event->attendees = is_array($event->attendees) ? $event->attendees : json_decode($event->attendees, true);
            return $event;
        }),
        ]);
    }


    public function eventShow(Event $event)
    {
    $event->attendees = json_decode($event->attendees, true) ?? [];
        return Inertia::render("Homepage/Event/Show", [
            "event" => $event
        ]);
    }


    public function calendarIndex()
    {
        return Inertia::render("Homepage/Calendar/Index", [
            "events" => Event::with("user")->get()
        ]);
    }

}
