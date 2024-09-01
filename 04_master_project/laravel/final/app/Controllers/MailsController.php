<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

// basic mailing example
class MailsController {
  function send(Request $request) {
    // prepare mail
    $subject = $request->input('subject');
    $content = $request->input('content');
    $to = $request->input('to');

    // send mail
    Mail::raw(
      $content,
      fn($mail) => $mail->to($to)->subject($subject),
    );

    // confirm
    return 'mail sent to: ' . $to;
  }
}
