# -*- coding: utf-8 -*-
import requests
from lektor.pluginsystem import Plugin


class GithubReposPlugin(Plugin):
    name = u'GitHub Repos'
    description = u'Fetches your GitHub repos for display'

    def on_process_template_context(self, context, **extra):
        context['get_github_repos'] = self.get_github_repos

    def get_github_repos(self, **kwargs):
        config = self.get_config()
        token = config.get('github-repos.token')
        count = kwargs.pop('count', 10)
        resp = requests.get(
            'https://api.github.com/user/repos',
            headers={'Authorization': 'token ' + token},
            params=kwargs,
        )
        return sorted(
            resp.json(),
            key=lambda repo: repo['stargazers_count'],
            reverse=True,
        )[:count]

