<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMoreInformationRequest;
use App\Models\MoreInformation;
use Symfony\Component\HttpFoundation\Response;

class MoreInformationController extends Controller
{
    private MoreInformation $moreInformation;

    public function __construct(MoreInformation $moreInformation)
    {
        $this->moreInformation = $moreInformation;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moreInformation = $this->moreInformation->all([
            'id',
            'numero_turma',
            'dias',
            'inicio',
            'encerramento',
            'local'
        ]);

        return response()->json(
            $moreInformation[0],
            Response::HTTP_OK
        );
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
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MoreInformation $moreInformation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MoreInformation $moreInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMoreInformationRequest $request, string $id)
    {
        $moreInformation = $this->moreInformation->findOrFail($id);

        $data = $request->validated();

        $moreInformation->update($data);

        return response()->json(
            $request->all(),
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MoreInformation $moreInformation)
    {
        //
    }
}