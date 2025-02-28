<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Event;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    "events" => Event::with("user")
        ->get()
        ->map(function ($event) {
            $event->attendees = is_array($event->attendees) ? $event->attendees : json_decode($event->attendees, true);
            return $event;
        }),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        "events" => Event::with("user")->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/psu/posts', [HomeController::class, 'postIndex']);
Route::get('/psu/events', [HomeController::class, 'eventIndex']);
Route::get('/psu/events/{event}', [HomeController::class, 'eventShow'])->name("event.home.show");
Route::get('/psu/calendar', [HomeController::class, 'calendarIndex']);

Route::middleware('auth')->group(function () {


Route::get('/generate-event-report', function () {
    $data = Event::with('user')
        ->where('user_id', Auth::id())
        ->get();

    $pdf = Pdf::loadView('pdf.template', ['data' => $data]);

    return $pdf->download('event-report.pdf');
});

    Route::resource("posts", PostController::class);
    Route::resource("events",EventController::class);
    Route::resource("calendar",CalendarController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
