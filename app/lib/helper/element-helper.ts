export const appendRipple = (element: Element) => {
  const target = element as HTMLElement;
  const parent = target.parentElement;
  if (!parent) return;

  // Ensure parent layout can anchor absolute children safely
  const parentComputedStyle = window.getComputedStyle(parent);
  if (parentComputedStyle.position === "static") {
    parent.style.position = "relative";
  }

  const rippleWrapper = document.createElement("div");
  rippleWrapper.className = "tour-ripple-container-wrapper";

  // Compute sizes dynamically to handle the input element layout bounding rectangle
  const rect = target.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  // Map top and left properties relative to the parent box offset limits
  const topOffset = rect.top - parentRect.top + rect.height / 2;
  const leftOffset = rect.left - parentRect.left + rect.width / 2;

  rippleWrapper.style.position = "absolute";
  rippleWrapper.style.top = `${topOffset}px`;
  rippleWrapper.style.left = `${leftOffset}px`;
  rippleWrapper.style.transform = "translate(-50%, -50%)";
  rippleWrapper.style.pointerEvents = "none";
  rippleWrapper.style.zIndex = "9999";

  rippleWrapper.innerHTML = `
        <div class="tour-ripple-container">
            <div class="tour-ripple-core"></div>
            <div class="tour-ripple-wave"></div>
            <div class="tour-ripple-wave-delayed"></div>
        </div>
    `;

  // Append to parent instead of breaking void input nodes
  parent.appendChild(rippleWrapper);
};

export const removeAllRipples = () => {
  document
    .querySelectorAll(".tour-ripple-container-wrapper")
    .forEach((ripple) => ripple.remove());
};
