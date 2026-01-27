import GhostContentAPI from '@tryghost/content-api';
import { config } from './config';

// Initialize the Ghost API client
const api = new GhostContentAPI({
    url: config.ghostUrl,
    key: config.contentApiKey,
    version: "v5.0"
});

export async function getPosts(page: number = 1, limit: number = 10) {
    return await api.posts
        .browse({
            limit: limit,
            page: page,
            filter: `tag:${config.filterTag}`,
            include: ['tags', 'authors'],
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export async function getFeaturedPosts() {
    return await api.posts
        .browse({
            limit: 3,
            filter: `tag:${config.filterTag}+featured:true`,
            include: ['tags', 'authors'],
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

export async function getSinglePost(slug: string) {
    return await api.posts
        .read({
            slug: slug,
        }, {
            include: ['tags', 'authors'],
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
}

export async function getAllTags() {
    return await api.tags
        .browse({
            limit: 'all',
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}
