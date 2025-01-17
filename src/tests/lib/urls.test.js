import { describe, it, expect } from 'vitest';
import { buildURL } from '$lib/urls';

describe('buildURL', () => {
	it('should build a basic URL with query parameters', () => {
		const result = buildURL('http://example.com', 'api/data', { key: 'value', page: '1' });
		expect(result).toBe('http://example.com/api/data?key=value&page=1');
	});

	it('should handle trailing slashes in baseURL', () => {
		const result = buildURL('http://example.com/', 'api/data', { key: 'value' });
		expect(result).toBe('http://example.com/api/data?key=value');
	});

	it('should handle leading slashes in path', () => {
		const result = buildURL('http://example.com', '/api/data', { key: 'value' });
		expect(result).toBe('http://example.com/api/data?key=value');
	});

	it('should handle both trailing and leading slashes', () => {
		const result = buildURL('http://example.com/', '/api/data', { key: 'value' });
		expect(result).toBe('http://example.com/api/data?key=value');
	});

	it('should handle multiple trailing slashes in baseURL', () => {
		const result = buildURL('http://example.com///', 'api/data', { key: 'value' });
		expect(result).toBe('http://example.com/api/data?key=value');
	});

	it('should handle multiple leading slashes in path', () => {
		const result = buildURL('http://example.com', '///api/data', { key: 'value' });
		expect(result).toBe('http://example.com/api/data?key=value');
	});

	it('should handle empty query parameters', () => {
		const result = buildURL('http://example.com', 'api/data', {});
		expect(result).toBe('http://example.com/api/data?');
	});

	it('should encode query parameter values', () => {
		const result = buildURL('http://example.com', 'api/data', {
			key: 'value with spaces',
			special: '!@#$%'
		});
		expect(result).toBe(
			'http://example.com/api/data?key=value+with+spaces&special=%21%40%23%24%25'
		);
	});

	it('should convert undefined values to "undefined" string', () => {
		const result = buildURL('http://example.com', 'api/data', { key: undefined, value: 'test' });
		expect(result).toBe('http://example.com/api/data?key=undefined&value=test');
	});

	it('should convert null values to "null" string', () => {
		const result = buildURL('http://example.com', 'api/data', { key: null, value: 'test' });
		expect(result).toBe('http://example.com/api/data?key=null&value=test');
	});

	it('should convert array to comma-separated string', () => {
		const result = buildURL('http://example.com', 'api/data', { items: ['a', 'b', 'c'] });
		expect(result).toBe('http://example.com/api/data?items=a%2Cb%2Cc');
	});

	it('should handle boolean values', () => {
		const result = buildURL('http://example.com', 'api/data', { isActive: true, isDeleted: false });
		expect(result).toBe('http://example.com/api/data?isActive=true&isDeleted=false');
	});

	it('should handle number values', () => {
		const result = buildURL('http://example.com', 'api/data', { count: 42, price: 19.99 });
		expect(result).toBe('http://example.com/api/data?count=42&price=19.99');
	});
});
