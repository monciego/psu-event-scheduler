<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render("Calendar/Index", [
            "events" => Event::with("user")->get()
        ]);
    }
}
