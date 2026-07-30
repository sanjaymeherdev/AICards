/**
 * Save & Share functionality for template editors
 * Include this script after utils.js in editor.html files
 */

// Save & Share functionality
let currentCardId = null;
let currentSlug = null;
let currentTemplateName = 'template';

async function saveAndShare() {
  // Check authentication first
  if (!Auth.isAuthenticated()) {
    Auth.requireAuth();
    return;
  }

  const state = getState();
  
  // Generate the same HTML as exportStandalone
  const cssContent = getCSSContent(state);

  // Build complete HTML
  const fullHTML = generateFullHTML(state, cssContent);

  // Show save dialog
  const user = Auth.getUser();
  const isPremium = user && user.is_premium;
  
  const dialog = document.createElement('div');
  dialog.className = 'save-dialog-overlay';
  dialog.innerHTML = `
    <div class="save-dialog">
      <h3>💾 Save & Share Your Card</h3>
      ${isPremium ? '<p class="premium-badge">👑 Premium Member</p>' : ''}
      <div class="form-group">
        <label>Custom Slug (optional for premium)</label>
        <input type="text" id="share-slug-input" placeholder="e.g., aanya-rohan-wedding" ${!isPremium ? 'disabled' : ''}>
        <small>${isPremium ? 'Choose your custom shareable URL' : 'Upgrade to premium for custom slugs'}</small>
      </div>
      <div class="dialog-actions">
        <button class="btn-cancel" onclick="closeSaveDialog()">Cancel</button>
        <button class="btn-save" onclick="confirmSave('${encodeURIComponent(JSON.stringify({html: fullHTML}))}')">Save & Get Link</button>
      </div>
    </div>
  `;
  document.body.appendChild(dialog);

  // Add styles
  if (!document.getElementById('save-dialog-styles')) {
    const style = document.createElement('style');
    style.id = 'save-dialog-styles';
    style.textContent = `
      .save-dialog-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .save-dialog {
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 450px;
        width: 90%;
        color: #333;
      }
      .save-dialog h3 {
        margin-bottom: 16px;
        color: #667eea;
      }
      .premium-badge {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        display: inline-block;
        margin-bottom: 16px;
        font-size: 0.85rem;
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #555;
      }
      .form-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }
      .form-group input:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
      }
      .form-group small {
        display: block;
        margin-top: 4px;
        color: #666;
        font-size: 0.8rem;
      }
      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 20px;
      }
      .btn-cancel {
        background: #f5f5f5;
        color: #666;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
      }
      .btn-save {
        background: #10b981;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
      }
      .btn-save:hover {
        background: #059669;
      }
    `;
    document.head.appendChild(style);
  }
}

function closeSaveDialog() {
  const dialog = document.querySelector('.save-dialog-overlay');
  if (dialog) dialog.remove();
}

async function confirmSave(encodedData) {
  const data = JSON.parse(decodeURIComponent(encodedData));
  const slugInput = document.getElementById('share-slug-input');
  const shareSlug = slugInput && slugInput.value.trim() || null;

  const btn = document.querySelector('.btn-save');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const cardData = {
      html_content: data.html,
      template_name: currentTemplateName,
      title: 'Wedding Invitation',
      status: 'published'
    };

    const result = await CardUtils.saveCard(cardData, shareSlug);
    currentCardId = result.id;
    currentSlug = result.share_slug || result.slug;

    closeSaveDialog();

    // Show success with share options
    showShareSuccess(result.share_slug || result.slug, result.is_paid);
  } catch (err) {
    alert(err.message);
    btn.disabled = false;
    btn.textContent = 'Save & Get Link';
  }
}

function showShareSuccess(slug, isPaid) {
  const dialog = document.createElement('div');
  dialog.className = 'share-success-overlay';
  dialog.innerHTML = `
    <div class="share-success">
      <div class="success-icon">✅</div>
      <h3>Card Saved Successfully!</h3>
      ${isPaid ? `
        <p>Your custom share link:</p>
        <div class="share-link-box">
          <input type="text" value="${window.location.origin}/card/${slug}" readonly>
          <button onclick="CardUtils.copyLink('${slug}')">📋 Copy</button>
        </div>
        <div class="share-buttons">
          <button class="share-btn whatsapp" onclick="CardUtils.shareToWhatsApp('${slug}')">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </button>
          <button class="share-btn email" onclick="CardUtils.shareToEmail('${slug}')">
            <i class="fas fa-envelope"></i> Email
          </button>
        </div>
      ` : `
        <p>✅ Card saved to your account</p>
        <p class="free-note">🔒 This card has a private link. Upgrade to premium or pay per template to get a custom shareable link.</p>
        <button class="btn-upgrade" onclick="Auth.showPaymentModal('${currentCardId || ''}')">💎 Upgrade to Share</button>
      `}
      <button class="btn-close" onclick="this.closest('.share-success-overlay').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(dialog);

  // Add styles
  if (!document.getElementById('share-success-styles')) {
    const style = document.createElement('style');
    style.id = 'share-success-styles';
    style.textContent = `
      .share-success-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .share-success {
        background: white;
        border-radius: 12px;
        padding: 32px;
        max-width: 450px;
        width: 90%;
        text-align: center;
        color: #333;
      }
      .success-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .share-success h3 {
        margin-bottom: 16px;
        color: #10b981;
      }
      .share-link-box {
        display: flex;
        gap: 8px;
        margin: 16px 0;
      }
      .share-link-box input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 13px;
      }
      .share-link-box button {
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
      }
      .share-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin: 16px 0;
      }
      .share-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s;
      }
      .share-btn:hover {
        transform: translateY(-2px);
      }
      .share-btn.whatsapp {
        background: #25D366;
        color: white;
      }
      .share-btn.email {
        background: #EA4335;
        color: white;
      }
      .free-note {
        background: #fff3cd;
        color: #856404;
        padding: 12px;
        border-radius: 8px;
        margin: 16px 0;
        font-size: 0.9rem;
      }
      .btn-upgrade {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .btn-close {
        background: #f5f5f5;
        color: #666;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }
}

// Helper functions - these need to be implemented by each template
function getCSSContent(state) {
  // This should be overridden by each template with its specific CSS
  return '';
}

function generateFullHTML(state, cssContent) {
  // This should be overridden by each template with its specific HTML generation
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Invitation</title>
  <style>${cssContent}</style>
</head>
<body>
  <!-- Template content goes here -->
</body>
</html>`;
}

// Set template name (call this in each editor)
function setTemplateName(name) {
  currentTemplateName = name;
}
