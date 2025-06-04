<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Receive Form Data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // 2. Validate Inputs
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: index.html#contact?status=error&reason=empty");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html#contact?status=error&reason=invalidemail");
        exit;
    }

    if (empty($subject)) {
        $subject = "Contact Form Submission";
    }

    // 3. Sanitize Inputs
    $name = htmlspecialchars($name);
    $subject = htmlspecialchars($subject);
    $sanitized_email = filter_var($email, FILTER_SANITIZE_EMAIL);
    // For plain text email, htmlspecialchars is good for the message to prevent issues if it's ever displayed in HTML.
    // If the email client interprets it as HTML, this will prevent XSS.
    // If it's strictly plain text, it might show entities, but it's safer.
    $message_content = htmlspecialchars($message);

    // 4. Construct Email
    $to = "jmyungjoon@gmail.com";
    $email_subject = $subject;

    $email_body = "Name: " . $name . "\n";
    $email_body .= "Email: " . $sanitized_email . "\n";
    $email_body .= "Message:\n" . $message_content . "\n";

    // Headers
    $headers = "From: " . $sanitized_email . "\r\n";
    $headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    // It's good practice to also include MIME-Version and X-Mailer, though not strictly required by the prompt.
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Send Email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // 6. Redirect After Sending (Success)
        header("Location: thank_you.html");
        exit;
    } else {
        // 6. Redirect After Sending (Failure)
        // Log error for server admin if possible, e.g., error_log("Mail send failed to $to from $sanitized_email");
        header("Location: index.html#contact?status=error&reason=sendfail");
        exit;
    }

} else {
    // Not a POST request, redirect to the form page or show an error
    header("Location: index.html#contact?status=error&reason=invalidrequest");
    exit;
}
?>
