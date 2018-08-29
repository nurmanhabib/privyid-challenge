<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PDFSignatureController extends Controller
{
    public function __invoke()
    {
        return view('pdf-signature');
    }
}
