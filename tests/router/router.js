import test from 'ava';
import Router from '../../routes/router';
import express from 'express';

let router = new Router(express());

test('router group must make right url with prefixes', t => {
    router.group('api', [], router => {
        t.is(router.getUrl(), '/api');
    })
});

test('router group must make right url with prefixes and multiply calls', t => {
    router.group('api', [], router => {
        router.group('v1', [], router => {
            t.is(router.getUrl(), '/api/v1');
        })
    })
});

