// Navbar tab switching logic
export function setupNavbar(onTabChange) {
    const buttons = document.querySelectorAll(".tab-btn");
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove 'active' class from all buttons
        buttons.forEach((b) => b.classList.remove("active"));
        // Add 'active' to the clicked button
        btn.classList.add("active");
  
        const tab = btn.getAttribute("data-tab");
        onTabChange(tab); // Callback to update content
      });
    });
  }
  