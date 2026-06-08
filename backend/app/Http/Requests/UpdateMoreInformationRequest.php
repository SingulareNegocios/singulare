<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMoreInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'numero_turma' => ['sometimes', 'string', 'min:1', 'max:5'],
            'dias' => ['sometimes', 'string', 'min:3', 'max:255'],
            'inicio' => ['sometimes', 'string', 'min:3', 'max:255'],
            'encerramento' => ['sometimes', 'string', 'min:3', 'max:255'],
            'local' => ['sometimes', 'string', 'min:3', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'numero_turma.min' => 'O campo NÚMERO DA TURMA deve conter no mínimo 1 caractere.',
            'numero_turma.max' => 'O campo NÚMERO DA TURMA deve conter no máximo 5 caracteres.',

            'dias.min' => 'O campo DIAS deve conter no mínimo 3 caracteres.',
            'dias.max' => 'O campo DIAS deve conter no máximo 255 caracteres.',

            'inicio.min' => 'O campo INÍCIO deve conter no mínimo 3 caracteres.',
            'inicio.max' => 'O campo INÍCIO deve conter no máximo 255 caracteres.',

            'encerramento.min' => 'O campo ENCERRAMENTO deve conter no mínimo 3 caracteres.',
            'encerramento.max' => 'O campo ENCERRAMENTO deve conter no máximo 255 caracteres.',

            'local.min' => 'O campo LOCAL deve conter no mínimo 3 caracteres.',
            'local.max' => 'O campo LOCAL deve conter no máximo 255 caracteres.',
        ];
    }
}