import _ from 'lodash'

const form = document.querySelector('.feedback-form');
const {
     elements: { email, message }
} = form;

let feedbackData;

try {
     feedbackData = JSON.parse(localStorage.getItem("feedback-form-state"));
     email.value = feedbackData.email;
     message.value = feedbackData.message;
} catch (error) {
     console.log(error);
}

const getFormData = _.throttle((event) => {
     if (event.currentTarget) {
          feedbackData = {
               email: email.value,
               message: message.value
          }
          localStorage.setItem("feedback-form-state", JSON.stringify(feedbackData));
     }
}, 500);

const submitEvent = (event) => {
     event.preventDefault();
     localStorage.removeItem("feedback-form-state");
     feedbackData = {
          email: email.value,
          message: message.value
     };
     console.log(feedbackData);
     event.currentTarget.reset();

}

form.addEventListener('input', getFormData);
form.addEventListener('submit', submitEvent);