const add_pin_modal = document.querySelector('.add_pin_modal');

document.querySelector('.add_pin').addEventListener('click', () => {
    add_pin_modal.style.opacity = 1;
    add_pin_modal.style.pointerEvents = 'all';
});

document.querySelector('.add_pin_modal').addEventListener('click', event => {
    if (event.target === add_pin_modal) {
        reset_modal();
    }
});

let pin_image_blob = null;

document.querySelector('#upload_img').addEventListener('change', event => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();
 
            reader.onload = function() {
                const new_image = new Image();

                new_image.src = reader.result;
                pin_image_blob = reader.result;

                new_image.onload = function() {
                    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

                    new_image.classList.add('pin_max_width');

                    document.querySelector('.add_pin_modal .pin_image').appendChild(new_image);
                    document.querySelector('#upload_img_label').style.display = 'none';

                    modals_pin.style.display = 'block';

                    if (
                        new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                        new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                    ) {
                        new_image.classList.remove('pin_max_width');
                        new_image.classList.add('pin_max_height');

                    }
                modals_pin.style.opacity = 1;
            }
        }
 
         reader.readAsDataURL(event.target.files[0])
       }
    }
    document.querySelector('#upload_img').value = '';
});

document.querySelector('.save_pin').addEventListener('click', () => {
    const users_data = {
        author: 'Jack',
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#pin_description').value,
        destination: document.querySelector('#pin_destination').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector('#pin_size').value
    }
// create_pin(users)
    console.log(users_data);
});



function reset_modal() {
    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

    add_pin_modal.style.opacity = 0;
    add_pin_modal.style.pointerEvents = 'none';
           document.querySelector('#upload_img_label').style.display = 'block';
           modals_pin.style.display = 'none';
           modals_pin.style.opacity = 0;

    if(modals_pin.children[0].children[0])  modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
    document.querySelector('#pin_title').value = '';
    document.querySelector('#pin_description').value = '';
    document.querySelector('#pin_destination').value = '';
    document.querySelector('#pin_size').value = '';
    pin_image_blob = null;
}