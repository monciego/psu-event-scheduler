<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Events/Index", [
            "events" => Event::with("user")->where("user_id", Auth::id())->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start' => 'required|date|after_or_equal:today',
            'end' => 'required|date|after_or_equal:date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $uploadedImage = $request->file('image')->store('uploads/images', 'public');
        }

       $request->user()->events()->create([
            'title' => $validated['title'],
            'image' => $uploadedImage,
            'description' => $validated['description'],
            'start' => $validated['start'],
            'end' => $validated['end'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        dd("save");



        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render("Events/Show", [
            "event" => $event
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

      $uploadedImage = $event->image ;


        if ($request->hasFile('image')) {
            $uploadedImage = $request->file('image')->store('uploads/images', 'public');
        }

        $event->update([
            'title' => $validated['title'],
            'image' => $uploadedImage,
            'description' => $validated['description'],
            'start' => $validated['start'],
            'end' => $validated['end'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        dd("save");



        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return redirect(route('events.index'));
    }
}
