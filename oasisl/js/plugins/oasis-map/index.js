module.exports = function(){

    var oasisMap = {

        openMap: function(options) {

            var options = options || {},
                width = options.width || '100%',
                height = options.height || '100%',
                path = window.oasisl_path || '';

            dialog.open({

                title: '地图',
                type: 2,
                html: true,
                maxmin: true,
                area: [width, height],
                content: path + '/oasisl/js/plugins/oasis-map/map.html',
                success: function(dom) {

                    var innerWindow = $(dom).find('iframe')[0].contentWindow;
                    var innerDocument = innerWindow.document;

                    $(innerDocument).ready(function() {

                         var mapjs = innerDocument.createElement('script');
                        innerDocument.body.appendChild(mapjs);
                        mapjs.src = options.gis + '?async=yes' || 'http://172.16.29.61:9150/FHGis/api/js?async=yes';
                        innerWindow.innerFunction(options);

                    })

                }

            });

        }

    }
    window.oasMap = oasisMap;
    return oasisMap;

}