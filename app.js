(function() {

    return {
        requests: {
            applyTargets: {
                url: 'https://devactivitystream.zendesk.com/api/v2/targets.json',
                type: 'POST',
                data: JSON.stringify({
                    title: 'Exmaples for all',
                    type: 'http_target',
                    active: true,
                    created_at: new Date(),
                    target_url: "http://example.com",
                    method: 'get',
                    content_type: 'json'
                }),
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        events: {
            'app.activated': 'doSomething'
        },

        doSomething: function() {
            console.log('my id is', this.id());
            // this.ajax('applyTargets').done(function() {
            //         console.log('targets reapplied');
            //     })
            //     .fail(function(err) {
            //         console.log('failed applying targets', err);
            //     });
        }
    };

}());
