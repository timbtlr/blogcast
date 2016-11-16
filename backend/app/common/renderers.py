from rest_framework.renderers import JSONRenderer


class SiteJsonRenderer(JSONRenderer):
    def render(self, data, media_type=None, renderer_context=None):
        """
        Renders HTTP responses for the WeddingSite API applications.
        Each response contains a 'data' and 'error' key with list
        payloads.
        """
        renderer_context = renderer_context or {}
        response = renderer_context['response']
        new_response = {
            'data': [],
            'errors': []
        }

        if response.status_code < 400:
            new_response['data'] = data
        else:
            error_list = []

            if isinstance(data, list) or not data.get("detail"):
                for key in data:
                    error_list.append({
                        "status": response.status_code,
                        "error_key": key,
                        "error_detail": data[key][0]
                    })
                new_response['errors'].append(error_list)
            else:
                new_response['errors'].append({
                    "status": response.status_code,
                    "error_key": data.get("error_key"),
                    "error_detail": data.get("detail")
                })

        return super(SiteJsonRenderer, self).render(
            data=new_response, renderer_context=renderer_context)