// Global booking object to store user selections
const booking = {
    service: null,
    therapist: null,
    time: null,
    date: null,
    paymentMethod: 'card'
};

// Service Selection
function selectService(name, price, duration) {
    booking.service = { name, price, duration };
    document.getElementById('nextBtn').disabled = false;
    
    // Add visual feedback
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Store in sessionStorage
    sessionStorage.setItem('booking', JSON.stringify(booking));
}

// Therapist Selection
function selectTherapist(name, specialty, image) {
    booking.therapist = { name, specialty, image };
    document.getElementById('nextBtn').disabled = false;
    
    // Add visual feedback
    const cards = document.querySelectorAll('.therapist-card');
    cards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Update sessionStorage
    sessionStorage.setItem('booking', JSON.stringify(booking));
}

// Time Slot Selection
function selectTimeSlot(time) {
    booking.time = time;
    booking.date = document.querySelector('.current-date').textContent;
    document.getElementById('nextBtn').disabled = false;
    
    // Add visual feedback
    const slots = document.querySelectorAll('.time-slot.available');
    slots.forEach(slot => slot.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Update sessionStorage
    sessionStorage.setItem('booking', JSON.stringify(booking));
}

// Payment Method Selection
function selectPayment(method) {
    booking.paymentMethod = method;
    
    // Add visual feedback
    const methods = document.querySelectorAll('.payment-method');
    methods.forEach(m => m.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Process Booking
function processBooking() {
    // Validate form
    const inputs = document.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--gray)';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real app, you would process payment here
    if (booking.paymentMethod === 'card') {
        // Process Stripe payment
        console.log('Processing Stripe payment...');
    }
    
    // Generate random booking ID
    const bookingId = 'SPA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    booking.bookingId = bookingId;
    
    // Save to sessionStorage and redirect
    sessionStorage.setItem('booking', JSON.stringify(booking));
    window.location.href = 'confirmation.html';
}

// Date Navigation
function prevDay() {
    console.log('Previous day');
    // In a real app, you would update the date and fetch available slots
}

function nextDay() {
    console.log('Next day');
    // In a real app, you would update the date and fetch available slots
}

// Initialize pages
document.addEventListener('DOMContentLoaded', function() {
    // Load booking data if available
    const savedBooking = sessionStorage.getItem('booking');
    if (savedBooking) {
        Object.assign(booking, JSON.parse(savedBooking));
    }
    
    // Service page
    if (document.querySelector('.service-grid')) {
        if (booking.service) {
            document.getElementById('nextBtn').disabled = false;
        }
    }
    
    // Therapist page
    if (document.querySelector('.therapist-list')) {
        if (booking.service) {
            document.getElementById('selected-service').textContent = 
                `${booking.service.name} • ${booking.service.duration} min`;
        }
        
        if (booking.therapist) {
            document.getElementById('nextBtn').disabled = false;
        }
    }
    
    // Timeslots page
    if (document.querySelector('.time-slots')) {
        if (booking.service && booking.therapist) {
            document.getElementById('booking-summary').textContent = 
                `${booking.service.name} with ${booking.therapist.name} • ${booking.service.duration} min`;
        }
        
        if (booking.time) {
            document.getElementById('nextBtn').disabled = false;
        }
    }
    
    // Review page
    if (document.querySelector('.booking-summary')) {
        if (booking.service) {
            document.getElementById('review-service').textContent = booking.service.name;
        }
        
        if (booking.therapist) {
            document.getElementById('review-therapist').textContent = booking.therapist.name;
        }
        
        if (booking.time && booking.date) {
            document.getElementById('review-time').textContent = `${booking.date} at ${booking.time}`;
        }
    }
    
    // Confirmation page
    if (document.querySelector('.confirmation-container')) {
        if (booking.bookingId) {
            document.querySelector('.detail-item:nth-child(1) span:last-child').textContent = booking.bookingId;
        }
        
        if (booking.service) {
            document.querySelector('.detail-item:nth-child(2) span:last-child').textContent = booking.service.name;
        }
        
        if (booking.therapist) {
            document.querySelector('.detail-item:nth-child(3) span:last-child').textContent = booking.therapist.name;
        }
        
        if (booking.time && booking.date) {
            document.querySelector('.detail-item:nth-child(4) span:last-child').textContent = `${booking.date} at ${booking.time}`;
        }
    }
});