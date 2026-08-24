// Service Worker de Firebase Cloud Messaging para CRM Euro.
// Este archivo debe vivir en la RAÍZ del repo, junto a index.html.
// No contiene datos secretos: el firebaseConfig es seguro de exponer públicamente.

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBvPq2K10tBFWKOry79tKKUW2HHUCGFPPY",
  authDomain: "crmeuro-14d7f.firebaseapp.com",
  projectId: "crmeuro-14d7f",
  storageBucket: "crmeuro-14d7f.firebasestorage.app",
  messagingSenderId: "386516899314",
  appId: "1:386516899314:web:998039a20080dedea3c76b"
});

const messaging = firebase.messaging();

// Se dispara cuando llega una notificación y la app NO está abierta / está en segundo plano.
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || "CRM Euro";
  const opciones = {
    body: (payload.notification && payload.notification.body) || "",
    icon: "assets/icon-192.png",
    badge: "assets/favicon-32.png"
  };
  self.registration.showNotification(titulo, opciones);
});

// Si tocan la notificación, abre (o enfoca) la app.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
