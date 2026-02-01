const auth = firebase.auth();
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // Redirect to home if already logged in
        window.location.href = 'index.html';
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear messages
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
    successMsg.style.display = 'none';

    // Validation
    if (!email || !password) {
        errorMsg.textContent = 'Please fill in all fields';
        errorMsg.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters';
        errorMsg.style.display = 'block';
        return;
    }

    // Show loading
    submitBtn.style.display = 'none';
    loading.style.display = 'block';

    try {
        console.log('[v0] Attempting login for:', email);

        const result = await auth.signInWithEmailAndPassword(email, password);
        console.log('[v0] Login successful:', result.user.email);

        successMsg.textContent = 'Login successful! Redirecting...';
        successMsg.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.log('[v0] Login error:', error.code, error.message);

        let errorText = 'Login failed. Please try again.';

        if (error.code === 'auth/user-not-found') {
            errorText = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorText = 'Incorrect password';
        } else if (error.code === 'auth/invalid-email') {
            errorText = 'Invalid email address';
        } else if (error.code === 'auth/user-disabled') {
            errorText = 'This account has been disabled';
        } else if (error.code === 'auth/too-many-requests') {
            errorText = 'Too many failed login attempts. Try again later';
        }

        errorMsg.textContent = errorText;
        errorMsg.style.display = 'block';

        submitBtn.style.display = 'block';
        loading.style.display = 'none';
    }
});
