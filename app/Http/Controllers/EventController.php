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
    "events" => Event::with("user")
        ->where("user_id", Auth::id())
        ->get()
        ->map(function ($event) {
            $event->attendees = is_array($event->attendees) ? $event->attendees : json_decode($event->attendees, true);
            return $event;
        }),
]);

/*         dd(Event::with("user")
            ->where("user_id", Auth::id())
            ->get()
            ->map(function ($event) {
                $event->attendees = json_decode($event->attendees, true) ?? []; // Ensure it's an array
                return $event;
            }),
        );
         return Inertia::render("Events/Index", [
            "events" => Event::with("user")->where("user_id", Auth::id())->get()
        ]); */
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
            'title' => 'required|string',
            'venue' => 'required|string',
            'description' => 'required|string',
            'start' => 'required|date|after_or_equal:today',
            'end' => 'required|date|after_or_equal:start',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'attendees' => 'nullable|array',
            'attendees.*' => 'in:1st Year,2nd Year,3rd Year,4th Year', // Ensure valid values
        ]);

        // Handle file upload
        $uploadedImage = null;
        if ($request->hasFile('image')) {
            $uploadedImage = $request->file('image')->store('uploads/images', 'public');
        }

        // Store event with attendees
        $event = $request->user()->events()->create([
            'title' => $validated['title'],
            'venue' => $validated['venue'],
            'image' => $uploadedImage,
            'description' => $validated['description'],
            'start' => $validated['start'],
            'end' => $validated['end'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'attendees' => json_encode($validated['attendees'] ?? []), // Store as JSON
        ]);

        return redirect(route('events.index'))->with('success', 'Event created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {

    $event->attendees = json_decode($event->attendees, true) ?? [];
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
            'title' => 'required|string',
            'venue' => 'required|string',
            'description' => 'required|string',
            'start' => 'required|date|after_or_equal:today',
            'end' => 'required|date|after_or_equal:date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'attendees' => 'nullable|array',
            'attendees.*' => 'in:1st Year,2nd Year,3rd Year,4th Year', // Ensure valid values
        ]);

      $uploadedImage = $event->image ;


        if ($request->hasFile('image')) {
            $uploadedImage = $request->file('image')->store('uploads/images', 'public');
        }

        $event->update([
            'title' => $validated['title'],
            'venue' => $validated['venue'],
            'image' => $uploadedImage,
            'description' => $validated['description'],
            'start' => $validated['start'],
            'end' => $validated['end'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'attendees' => json_encode($validated['attendees'] ?? []),
        ]);

        return redirect(route('events.index'));
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
