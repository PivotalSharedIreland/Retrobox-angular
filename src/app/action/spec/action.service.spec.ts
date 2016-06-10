import {HTTP_PROVIDERS, XHRBackend, RequestMethod, ResponseOptions, Response} from "angular2/http";
import {MockBackend} from "angular2/src/http/backends/mock_backend";
import {beforeEachProviders, it, injectAsync} from "angular2/testing";
import {provide} from "angular2/core";
import {Action} from "../action";
import ActionService from "../action.service";

describe('ActionService', () => {

    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            ActionService
        ];
    });

    it('should get the list of actions of a given board', injectAsync([XHRBackend, ActionService], (mockBackend, actionService) => {

        var responseBody = [
            {'id': 1, 'description': 'foo', 'owner': 'bar'},
            {'id': 1, 'description': 'baz', 'owner': 'qux'}
        ];

        return new Promise(
            (resolve) => {

                mockBackend.connections.subscribe(connection => {
                    expect(connection.request.url.toString()).toContain("/actions?boardId=1");
                    expect(connection.request.method).toEqual(RequestMethod.Get);

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: responseBody
                    })));
                });

                actionService.getActions().subscribe((res) => {
                    expect(res).toBe(responseBody);
                    resolve();
                })
            })
    }));

    it('should send an action to the backend', injectAsync([XHRBackend, ActionService], (mockBackend, actionService) => {
        let actionToCreate = new Action({description: 'Text description', owner: 'owner_'});
        var request = null;
        var responseBody = {
            id: 1,
            description: "Text description",
            owner: "owner_",
            createdDate: "2016-04-18T16:31:00.972Z",
            lastModifiedDate: "2016-04-18T16:31:00.972Z",
            status: "NEW"
        };

        var promise = new Promise(
            (resolve) => {
                mockBackend.connections.subscribe(connection => {
                    request = connection.request;
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 201,
                        body: responseBody
                    })));
                });

                actionService.addAction(actionToCreate).subscribe(
                    (res) => {
                        expect(res).toBe(responseBody);
                        resolve();
                    }
                )
            }
        );

        expect(request.url.toString()).toContain("/actions");
        expect(request.headers.get("Content-Type")).toEqual("application/json");
        expect(request.method).toEqual(RequestMethod.Post);

        var requestBody = JSON.parse(request.text());
        expect(actionToCreate.description).toEqual(requestBody.description);
        expect(actionToCreate.owner).toEqual(requestBody.owner);

        return promise;
    }));

});
