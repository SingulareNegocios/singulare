<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $feedbacks = Feedback::query()
            ->when($request->has('name'), fn ($query) =>
                $query->where('name', 'like', "%{$request['name']}%")
            )
            ->orderBy('created_at', 'desc')
            ->paginate((int) $request->per_page);

        return response()->json($feedbacks, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request): JsonResponse
    {
        $feedback = Feedback::create($request->validated());

        return response()->json($feedback, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback): JsonResponse
    {
        return response()->json($feedback, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback): JsonResponse
    {
        
        $feedback->update($request->validated());

        return response()->json($feedback, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback): JsonResponse
    {
        $feedback->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}