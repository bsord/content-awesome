try:
    import unzip_requirements
except:
    pass

def edge_viewer(event, context):
    request = event['Records'][0]['cf']['request']
    print("edge_viewer request:", request)
    return request

def edge_origin(event, context):
    request = event['Records'][0]['cf']['request']
    print("edge_origin request:", request)
    return request
