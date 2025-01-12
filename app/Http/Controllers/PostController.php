<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Post/Index", [
            "posts" => Post::with('user')->where('user_id', Auth::id())->get()
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
            'post' => 'required|string|max:255',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate each file
        ]);

        $uploadedImages = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('uploads/images', 'public'); // Store in the 'public/uploads/images' directory
                $uploadedImages[] = $path;
            }
        }

        $request->user()->posts()->create([
            'post' => $validated['post'],
            'images' => json_encode($uploadedImages), // Save as JSON
        ]);

        dd("save");



        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'post' => 'required|string|max:255',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate each file
        ]);

    $uploadedImages = $post->images ? json_decode($post->images, true) : []; // Load existing images

        if ($request->hasFile('images')) {
        $uploadedImages = []; // Clear existing images if new ones are uploaded
            foreach ($request->file('images') as $file) {
                $path = $file->store('uploads/images', 'public'); // Store in the 'public/uploads/images' directory
                $uploadedImages[] = $path;
            }
        } else {

        }

        $post->update([
            'post' => $validated['post'],
            'images' => json_encode($uploadedImages), // Save as JSON
        ]);

        dd("save");



        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect(route('posts.index'));
    }
}
