import { register } from 'register-service-worker';
import { Notify, Dialog, Loading, QSpinnerGears } from 'quasar';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready(/* registration */) {
    // console.log('Service worker is active.')
  },

  registered(/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached(/* registration */) {
    // console.log('Content has been cached for offline use.')
    Loading.hide();
    Notify.create({
      message: 'Application installée',
    });
  },

  updatefound(/* registration */) {
    Notify.create({
      spinner: QSpinnerGears,
      message:
        "L'application Web est en cours d'installation (cela peut prendre quelques minutes), veuillez patienter",
    });
    setTimeout(() => {
      Loading.hide();
    }, 6000);
  },

  updated(/* registration */) {
    Dialog.create({
      title: 'La nouvelle version est prête',
      message: 'Rechargement.. ',
      persistent: true,
    }).onOk(() => {
      window.location.reload();
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // console.log('New content is available; please refresh.')
  },

  offline() {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error(/* err */) {
    // console.error('Error during service worker registration:', err)
  },
});
