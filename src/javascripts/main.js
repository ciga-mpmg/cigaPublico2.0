import '@popperjs/core';

import 'bootstrap';

import bootstrap, { Tooltip, Popover, Dropdown } from 'bootstrap';

const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
);

const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
);

const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new Popover(popoverTriggerEl)
);

import './navigation';
import './pagination';
import './slide';
import './modal';
