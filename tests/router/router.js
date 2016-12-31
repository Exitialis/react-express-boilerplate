import Router from '../../routes/router';
import express from 'express';

let router = new Router(express());

it('router group must make right url with prefixes', () => {
    router.group('api', [], router => {
        expect(router.getUrl()).toBe('/api');
    })
});

it('router group must make right url with prefixes and multiply calls', () => {
    router.group('api', [], router => {
        router.group('v1', [], router => {
            expect(router.getUrl()).toBe('/api/v1');
        })
    })
});

