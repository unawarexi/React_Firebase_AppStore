export const fadeInUp = {
  initial: { opacity: 0.5, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const smoothPopIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const layoutSmooth = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};


// Animation variants for menu items
export const menuItemVariants = {
  closed: {
    opacity: 0,
    x: -16,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const subMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};