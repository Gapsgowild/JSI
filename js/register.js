const auth = firebase.auth();
const registerForm = document.getElementById('registerForm');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');

// Initialize button as disabled
submitBtn.disabled = true;

// Password requirement checkers
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // Redirect to home if already logged in
        window.location.href = 'index.html';
    }
});

// Real-time password validation
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let isValid = true;

    // Check length
    if (password.length >= 6) {
        reqLength.textContent = '✓';
        reqLength.classList.add('done');
    } else {
        reqLength.textContent = '○';
        reqLength.classList.remove('done');
        isValid = false;
    }

    // Check uppercase
    if (/[A-Z]/.test(password)) {
        reqUpper.textContent = '✓';
        reqUpper.classList.add('done');
    } else {
        reqUpper.textContent = '○';
        reqUpper.classList.remove('done');
        isValid = false;
    }

    // Check number
    if (/[0-9]/.test(password)) {
        reqNumber.textContent = '✓';
        reqNumber.classList.add('done');
    } else {
        reqNumber.textContent = '○';
        reqNumber.classList.remove('done');
        isValid = false;
    }

    submitBtn.disabled = !isValid || confirmPasswordInput.value !== password;
});

// Check password match on input
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const isPasswordValid = /^.{6,}[A-Z].*[0-9]|^.{6,}[A-Z0-9].*[A-Z]|^.{6,}[0-9].*[A-Z]/.test(password)
        || (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password));

    submitBtn.disabled = !isPasswordValid || password !== confirmPassword;
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Clear messages
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
    successMsg.style.display = 'none';

    // Validation
    if (!email || !password || !confirmPassword) {
        errorMsg.textContent = 'Please fill in all fields';
        errorMsg.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters';
        errorMsg.style.display = 'block';
        return;
    }

    if (!/[A-Z]/.test(password)) {
        errorMsg.textContent = 'Password must contain at least one uppercase letter';
        errorMsg.style.display = 'block';
        return;
    }

    if (!/[0-9]/.test(password)) {
        errorMsg.textContent = 'Password must contain at least one number';
        errorMsg.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match';
        errorMsg.style.display = 'block';
        return;
    }

    // Show loading
    submitBtn.style.display = 'none';
    loading.style.display = 'block';

    try {
        console.log('[v0] Attempting registration for:', email);

        const result = await auth.createUserWithEmailAndPassword(email, password);
        console.log('[v0] Registration successful:', result.user.email);

        successMsg.textContent = 'Account created successfully! Redirecting...';
        successMsg.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.log('[v0] Registration error:', error.code, error.message);

        let errorText = 'Registration failed. Please try again.';

        if (error.code === 'auth/email-already-in-use') {
            errorText = 'This email is already registered';
        } else if (error.code === 'auth/invalid-email') {
            errorText = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
            errorText = 'Password is too weak';
        } else if (error.code === 'auth/operation-not-allowed') {
            errorText = 'Account creation is not available';
        }

        errorMsg.textContent = errorText;
        errorMsg.style.display = 'block';

        submitBtn.style.display = 'block';
        loading.style.display = 'none';
    }
});
