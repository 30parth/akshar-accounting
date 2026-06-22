<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentConteroller extends Controller
{
    public function index()
    {
        $students = Student::all();

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        return Inertia::render('students/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);

        Student::create($request->all());

        return redirect()->route('students.index');
    }

    public function edit($id)
    {
        $student = Student::find($id);

        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        $student->update($request->all());

        return redirect()->route('students.index');
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        $student->delete();

        return redirect()->route('students.index');
    }
}
