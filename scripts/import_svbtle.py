#!/usr/bin/env python

"""
Quick and dirty Svbtle importer for Lektor

Fetches Svbtle blog entries from atom feed (/feed) and creates Lektor records
through the admin API. You need to have the Lektor server running.

Example usage:

./import_svbtle.py http://blog.marksteve.com --path /blog --model blog-post
"""

import click
import feedparser
import requests
from html2text import html2text


@click.command()
@click.argument('url')
@click.option('--path', default='/', help="Path of parent record")
@click.option('--model', default=None, help="Generated record model")
@click.option('--admin', default='http://localhost:5000',
              help="Lektor admin url")
def main(url, path, model, admin):
    feed_url = url if url.endswith('/feed') else url.rstrip('/') + '/feed'
    d = feedparser.parse(feed_url)
    click.secho("Started import", fg='cyan')
    for entry in d.entries:
        body = html2text(entry.content[0]['value'])
        pub_date = '-'.join(map(str, entry.published_parsed[:3]))
        values = {
            'data': {
                'title': entry.title,
                'body': body,
                'pub_date': pub_date,
            },
            'id': entry.link.rsplit('/', 1)[1],
            'path': path,
        }
        r = requests.post(admin.rstrip('/') + '/admin/api/newrecord',
                          json=values)
        r.raise_for_status()
        click.echo(click.style('I', fg='green') + ' ' + entry.link)
    click.secho("Finished importing {} entries".format(len(d.entries)),
                fg='cyan')


if __name__ == '__main__':
    main()

