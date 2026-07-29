/**
 * Shared utilities for authentication, payments, and card operations
 * Include this script in any page that needs auth/payment functionality
 */

// Configuration - these should be set via environment variables in production
const API_BASE = window.location.origin;
const BASE_URL = window.location.origin;

// Auth Utilities
const Auth = {
    getToken() {
        return localStorage.getItem('authToken');
    },

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    isPremium() {
        const user = this.getUser();
        return user && user.is_premium === true;
    },

    async checkAuth() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const response = await fetch(`${API_BASE}/api/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Session expired');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            return null;
        }
    },

    requireAuth(redirectUrl) {
        if (!this.isAuthenticated()) {
            const currentUrl = encodeURIComponent(redirectUrl || window.location.href);
            window.location.href = `/auth?redirect=${currentUrl}`;
            return false;
        }
        return true;
    },

    async requirePremium(cardId = null) {
        if (!this.isAuthenticated()) {
            this.requireAuth();
            return false;
        }

        if (this.isPremium()) {
            return true;
        }

        // Check if card is already paid
        if (cardId) {
            const isPaid = await this.checkCardPayment(cardId);
            if (isPaid) return true;
        }

        // Show payment modal
        this.showPaymentModal(cardId);
        return false;
    },

    async checkCardPayment(cardId) {
        const token = this.getToken();
        if (!token) return false;

        try {
            const response = await fetch(`${API_BASE}/api/cards/${cardId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) return false;

            const card = await response.json();
            return card.is_paid === true;
        } catch (err) {
            return false;
        }
    },

    showPaymentModal(cardId = null) {
        const modal = document.createElement('div');
        modal.id = 'payment-modal';
        modal.className = 'payment-modal-overlay';
        modal.innerHTML = `
            <div class="payment-modal">
                <button class="payment-close" onclick="Auth.closePaymentModal()">&times;</button>
                <h2>💎 Upgrade to Share</h2>
                <div class="payment-options">
                    <div class="payment-option" onclick="Auth.initiatePayment('premium')">
                        <div class="option-icon">👑</div>
                        <h3>Premium Access</h3>
                        <p class="price">₹5,000</p>
                        <p class="desc">One-time payment for unlimited custom slugs & sharing</p>
                        <button class="btn-select">Select Premium</button>
                    </div>
                    <div class="payment-option" onclick="Auth.initiatePayment('per_template', '${cardId || ''}')">
                        <div class="option-icon">🎴</div>
                        <h3>Single Template</h3>
                        <p class="price">₹1,000</p>
                        <p class="desc">Pay per template for custom slug & sharing</p>
                        <button class="btn-select">Select Template</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add styles if not already present
        if (!document.getElementById('payment-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'payment-modal-styles';
            style.textContent = `
                .payment-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                .payment-modal {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 800px;
                    width: 90%;
                    position: relative;
                    color: #333;
                }
                .payment-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }
                .payment-modal h2 {
                    text-align: center;
                    margin-bottom: 24px;
                    color: #667eea;
                }
                .payment-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                .payment-option {
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    padding: 24px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .payment-option:hover {
                    border-color: #667eea;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(102,126,234,0.2);
                }
                .option-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }
                .payment-option h3 {
                    margin-bottom: 8px;
                    color: #333;
                }
                .price {
                    font-size: 28px;
                    font-weight: bold;
                    color: #667eea;
                    margin: 12px 0;
                }
                .desc {
                    color: #666;
                    margin-bottom: 16px;
                    line-height: 1.5;
                }
                .btn-select {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.3s;
                }
                .btn-select:hover {
                    background: #5a6fd6;
                }
            `;
            document.head.appendChild(style);
        }
    },

    closePaymentModal() {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            modal.remove();
        }
    },

    async initiatePayment(type, cardId = null) {
        const token = Auth.getToken();
        if (!token) {
            alert('Please login first');
            this.requireAuth();
            return;
        }

        const btn = event.target.closest('.payment-option').querySelector('.btn-select');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Processing...';

        try {
            const response = await fetch(`${API_BASE}/api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: type,
                    card_id: cardId,
                    amount: type === 'premium' ? 5000 : 1000
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Payment initiation failed');
            }

            // Redirect to payment gateway
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else if (data.payment_session_id) {
                // Handle based on payment gateway response
                alert('Payment session created. You will be redirected.');
                // Additional logic for specific gateway handling
            }
        } catch (err) {
            alert(err.message);
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }
};

// Card Utilities
const CardUtils = {
    async saveCard(cardData, shareSlug = null) {
        const token = Auth.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const user = Auth.getUser();
        const isPremium = user && user.is_premium;

        // Determine slug logic
        let finalSlug = shareSlug;
        let isPaid = false;

        if (shareSlug) {
            // User wants custom slug - check if allowed
            if (!isPremium && !cardData.is_paid) {
                throw new Error('Custom slugs require premium or per-template payment');
            }
            isPaid = true;
        } else {
            // Generate random slug for free users
            finalSlug = 'card-' + Math.random().toString(36).substring(2, 15);
        }

        const response = await fetch(`${API_BASE}/api/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...cardData,
                share_slug: finalSlug,
                is_paid: isPaid
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Save failed');
        }

        return await response.json();
    },

    async updateCard(cardId, cardData) {
        const token = Auth.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_BASE}/api/cards/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cardData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Update failed');
        }

        return await response.json();
    },

    getShareUrl(slug) {
        return `${BASE_URL}/card/${slug}`;
    },

    copyLink(slug) {
        const url = this.getShareUrl(slug);
        navigator.clipboard.writeText(url).then(() => {
            alert('✅ Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('✅ Link copied to clipboard!');
        });
    },

    shareToWhatsApp(slug) {
        const url = this.getShareUrl(slug);
        const text = '💕 Check out our wedding invitation!';
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    },

    shareToEmail(slug) {
        const url = this.getShareUrl(slug);
        const text = 'Check out our wedding invitation!';
        window.open(`mailto:?subject=Wedding Invitation&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank');
    },

    shareToInstagram(slug) {
        const url = this.getShareUrl(slug);
        // Instagram doesn't support direct sharing via URL, so copy to clipboard
        this.copyLink(slug);
        alert('Link copied! Open Instagram and paste it in your story or bio.');
    }
};

// Payment verification (called after redirect from payment gateway)
async function verifyPayment(orderId, paymentId, signature) {
    const token = Auth.getToken();
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE}/api/payment/verify-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            order_id: orderId,
            payment_id: paymentId,
            signature: signature
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Payment verification failed');
    }

    return await response.json();
}

// Auto-check payment status on page load (for callback_url redirects)
async function checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    const paymentId = urlParams.get('payment_id');
    const signature = urlParams.get('signature');

    if (orderId && paymentId && signature) {
        try {
            await verifyPayment(orderId, paymentId, signature);
            // Clear URL params
            window.history.replaceState({}, document.title, window.location.pathname);
            alert('✅ Payment successful! You can now share your card with a custom slug.');
        } catch (err) {
            console.error('Payment verification failed:', err);
            alert('Payment verification failed. Please contact support.');
        }
    }
}

// Run payment status check on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', checkPaymentStatus);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Auth, CardUtils, verifyPayment, checkPaymentStatus };
}
