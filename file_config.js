async function register(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const registerBtn = document.querySelector('#registerForm button[type="submit"]');

    // Clear any existing errors
    clearErrors();

    // Validate name (at least 3 characters)
    if (name.length < 3) {
        showError('registerForm', 'Name must be at least 3 characters long');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('registerForm', 'Please enter a valid email address');
        return;
    }

    // Validate password (Firebase requires at least 6 characters)
    if (password.length < 6) {
        showError('registerForm', 'Password must be at least 6 characters long');
        return;
    }

    // Show loading state
    registerBtn.disabled = true;
    registerBtn.textContent = 'Creating account...';

    try {
        // Create user in Firebase
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update profile with name
        await user.updateProfile({
            displayName: name
        });

        // Store additional user data in Firestore
        await firebase.firestore().collection('users').doc(user.uid).set({
            displayName: name,
            email: email,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        });

        // Success - redirect to dashboard
        window.location.href = './customer_dashboard.html';
    } catch (error) {
        console.error('Registration error:', error);
        let errorMessage;
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please use a different email or try logging in.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password registration is not enabled. Please contact support.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please use at least 6 characters.';
                break;
            default:
                errorMessage = 'Registration failed. Please check your details and try again.';
        }
        
        showError('registerForm', errorMessage);
    } finally {
        // Reset button state
        registerBtn.disabled = false;
        registerBtn.textContent = 'Register';
    }
}

// Improved error display function
function showError(formId, message) {
    const form = document.getElementById(formId);
    const errorDiv = form.querySelector('.error') || document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.style.color = '#d93025';
    errorDiv.style.marginTop = '10px';
    errorDiv.style.textAlign = 'center';
    errorDiv.textContent = message;
    
    if (!form.querySelector('.error')) {
        form.appendChild(errorDiv);
    }
}

// Clear existing errors
function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.remove());
}