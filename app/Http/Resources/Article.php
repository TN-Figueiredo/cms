<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class Article extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);

//        Usage Example
        return [
            'id' => $this->id,
            'author' => User::findOrFail($this->user_id)->only('name', 'username'),
            'title' => $this->title,
            'body' => $this->body,
            'image' => $this->image,
            'posted_at' => $this->posted_at
        ];
    }

//    public function with($request) {
//        return [
//            'version' => '1.0.0',
//            'author_url' => url('https://github.com/TN-Figueiredo')
//        ];
//    }
}
