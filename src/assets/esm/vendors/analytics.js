import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import customerIo from '@analytics/customerio';

/* Initialize analytics */
const analytics = Analytics({
    app: 'my-app-name',
    version: 100,
    plugins: [
        googleAnalytics({
            trackingId: 'UA-121991291',
        }),
        customerIo({
            siteId: '123-XYZ'
        })
    ]
});
   
/* Track a page view */
analytics.page();
   
/* Track a custom event */
analytics.track('userPurchase', {
    price: 2500,
    item: 'Macbook Pro'
});
   
/* Identify a visitor */
analytics.identify('user-id-XYZ', {
    firstName: 'Nurul Amin',
    lastName: 'Muhit',
    email: 'email@muhit.me'
});

export default analytics;