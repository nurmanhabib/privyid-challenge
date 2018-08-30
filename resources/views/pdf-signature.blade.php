@extends('layouts.app')

@push('scripts')
@endpush

@push('styles')
  <style>
    .signature {
      border: 1px solid yellow;
    }

    #pdf-canvas {
      border: 1px solid black;
    }
  </style>
@endpush

@section('content')
  <div class="container">
    <div class="card">
      <div id="pdf-signature" class="card-body">
        <h1>Tanda Tangan</h1>

        <div class="row">
          <div class="col">
            <div class="signature draggable drag-drop" style="display: inline-block;">
              <img src="{{ asset('img/signature.png') }}" alt="Signature">
            </div>

            <hr>

            <canvas id="pdf-canvas" class="dropzone mt-3"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
